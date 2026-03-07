from __future__ import annotations

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path('/home/user/workspace/sparx-engineering-site-work')
OUT = ROOT / 'src' / 'data' / 'productCatalog.json'
SITEMAP_DIR = Path('/home/user/workspace/assets_tmp/sitemaps')
METEORY_MD = Path('/home/user/workspace/resources/webpages/webpage_https:__www.meteory-eg.com_products.md')


def title_from_slug(slug: str) -> tuple[str, str|None]:
    slug = slug.strip('/').split('/')[-1]
    # Extract model prefix like 55000-317apo
    model = None
    m = re.match(r'^([0-9]{4,}-[0-9a-z]{3,})-(.+)$', slug)
    if m:
        model = m.group(1).upper()
        slug = m.group(2)
    slug = slug.replace('-', ' ')
    name = re.sub(r'\b(apo|mar|is)\b', '', slug, flags=re.I)
    name = re.sub(r'\s+', ' ', name).strip()
    name = name.title()
    return name, model


def parse_sitemap(path: Path, brand: str, include_prefix: str) -> list[dict]:
    xml = path.read_text('utf-8', errors='ignore')
    soup = BeautifulSoup(xml, 'xml')
    products = []
    for url_node in soup.find_all('url'):
        loc = url_node.find('loc')
        if not loc:
            continue
        url = loc.get_text(strip=True)
        if not url.startswith(include_prefix):
            continue
        # skip indexes
        if url.rstrip('/') in (include_prefix.rstrip('/'), include_prefix.rstrip('/') + '/products'):
            continue
        # primary image if present
        img = None
        img_loc = url_node.find('image:loc')
        if img_loc:
            img = img_loc.get_text(strip=True)
        name, model = title_from_slug(url)
        pid = f"{brand.lower()}-{re.sub(r'[^a-z0-9]+','-',(model or name).lower()).strip('-')}"
        products.append({
            'id': pid,
            'brand': brand,
            'name': name,
            'url': url,
            'image': img,
            'category': None,
            'model': model,
            'short_description': None,
            'specs': {},
            'datasheets': []
        })
    # de-dupe
    seen=set(); out=[]
    for p in products:
        if p['url'] in seen: continue
        seen.add(p['url'])
        out.append(p)
    return out


def parse_meteory_from_md(md_text: str) -> list[dict]:
    # Very lightweight parser: detect patterns
    # ![Image ...](url) then category line then name header then description
    lines = md_text.splitlines()
    products=[]
    img=None
    current_cat=None
    i=0
    while i < len(lines):
        line=lines[i].strip()
        m=re.match(r'^!\[.*\]\((https?://[^)]+)\)', line)
        if m:
            img=m.group(1)
            i+=1
            continue
        # category tag lines (e.g., CO2, Dry Powder, Systems)
        if line in ('CO2','Foam','Dry Powder','Systems'):
            current_cat=line
            i+=1
            continue
        # product name header '---' underline
        if line and i+1 < len(lines) and lines[i+1].strip().startswith('------'):
            name=line
            # next paragraph might be description
            desc=None
            if i+2 < len(lines):
                desc=lines[i+2].strip() or None
            slug=None
            # attempt to find a /products/{slug}/datasheet link nearby
            window='\n'.join(lines[i:i+40])
            m2=re.search(r'https://www\.meteory-eg\.com/products/([^/]+)/datasheet', window)
            datasheet_url=None
            if m2:
                slug=m2.group(1)
                datasheet_url=f'https://www.meteory-eg.com/products/{slug}/datasheet'
            url='https://www.meteory-eg.com/products'
            if slug:
                url=f'https://www.meteory-eg.com/products/{slug}'
            pid=f"meteory-{re.sub(r'[^a-z0-9]+','-',(slug or name).lower()).strip('-')}"
            products.append({
                'id': pid,
                'brand': 'Meteory',
                'name': name,
                'url': url,
                'image': img,
                'category': current_cat,
                'model': None,
                'short_description': desc,
                'specs': {},
                'datasheets': ([{'label':'Datasheet (PDF)','url': datasheet_url}] if datasheet_url else [])
            })
            i+=2
            continue
        i+=1
    # de-dupe by id
    seen=set(); out=[]
    for p in products:
        if p['id'] in seen: continue
        seen.add(p['id'])
        out.append(p)
    return out


def main():
    apollo = parse_sitemap(SITEMAP_DIR/'apollo-products-sitemap.xml','Apollo','https://apollo-fire.co.uk/products/')
    sri = parse_sitemap(SITEMAP_DIR/'sri-product-sitemap.xml','SRI','https://sri.com.my/product/')
    meteory = parse_meteory_from_md(METEORY_MD.read_text('utf-8',errors='ignore'))

    products = meteory + apollo + sri
    products.sort(key=lambda p: (p['brand'], p.get('category') or '', p['name']))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Wrote', OUT, 'items', len(products), 'meteory', len(meteory), 'apollo', len(apollo), 'sri', len(sri))

if __name__=='__main__':
    main()

from pathlib import Path
import re

base = Path(r'e:\website\felix-bw.github.io')
pattern = re.compile(r'(<p>&copy;\s*2026\s+Maier\s+Felix)(</p>)')
updated = []
for path in sorted(base.glob('**/*.html')):
    text = path.read_text(encoding='utf-8')
    if 'href="/impressum.html"' in text:
        continue
    new_text = pattern.sub(r"\1 | <a href='/impressum.html'>Impressum</a>\2", text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated.append(str(path.relative_to(base)))
print('\n'.join(updated))

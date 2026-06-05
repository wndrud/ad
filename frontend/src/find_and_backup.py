import os
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

search_dirs = [
    'C:/Users/82108/AppData',
    'C:/Users/82108/.IntelliJIdea*',
    'C:/Users/82108/IdeaProjects'
]

backup_dir = 'C:/Users/82108/IdeaProjects/ad/frontend/src/backup'
os.makedirs(backup_dir, exist_ok=True)

found_files = []

for s_dir in search_dirs:
    # Handle wildcard paths
    if '*' in s_dir:
        parent = os.path.dirname(s_dir)
        pattern = os.path.basename(s_dir).replace('*', '')
        if os.path.exists(parent):
            for d in os.listdir(parent):
                if pattern in d:
                    full_d = os.path.join(parent, d)
                    if os.path.isdir(full_d):
                        print(f"Searching wildcard dir: {full_d}")
                        for root, dirs, files in os.walk(full_d):
                            for f in files:
                                if f == 'App.jsx':
                                    p = os.path.join(root, f)
                                    found_files.append(p)
    else:
        if os.path.exists(s_dir):
            print(f"Searching dir: {s_dir}")
            for root, dirs, files in os.walk(s_dir):
                # skip node_modules to be fast
                if 'node_modules' in root:
                    continue
                for f in files:
                    if f == 'App.jsx':
                        p = os.path.join(root, f)
                        # Skip the active one in frontend/src/App.jsx
                        if 'frontend/src/App.jsx' in p.replace('\\', '/'):
                            continue
                        found_files.append(p)

for idx, p in enumerate(found_files):
    size = os.path.getsize(p)
    print(f"FOUND: {p} (size {size} bytes)")
    # Copy to backup dir
    dest = os.path.join(backup_dir, f"App_{idx}_{size}.jsx")
    try:
        shutil.copy2(p, dest)
        print(f"  Backed up to {dest}")
    except Exception as e:
        print(f"  Failed to backup: {e}")

print("Search and backup finished.")

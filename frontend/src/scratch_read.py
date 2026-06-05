import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

backup_dir = 'C:/Users/82108/IdeaProjects/ad/frontend/src/backup'

if os.path.exists(backup_dir):
    for f in sorted(os.listdir(backup_dir)):
        p = os.path.join(backup_dir, f)
        if f.endswith('.jsx'):
            print(f"=== Backup File: {f} ===")
            content = open(p, 'r', encoding='utf-8', errors='replace').read()
            lines = content.splitlines()
            # Find line where 'Nội dung Ngắn mạng Xã hội' is defined
            found = False
            for idx, line in enumerate(lines):
                if 'Nội dung Ngắn mạng Xã hội' in line:
                    start = idx
                    end = min(len(lines), idx + 15)
                    print(f"Found translation block starting at line {start+1}:")
                    for i in range(start, end):
                        print(f"  {i+1}: {lines[i]}")
                    found = True
                    break
            if not found:
                print("Translation block not found")
            print("-"*50)
else:
    print("Backup dir does not exist")

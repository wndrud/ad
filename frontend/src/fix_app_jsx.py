import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'C:/Users/82108/IdeaProjects/ad/frontend/src/App.jsx'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

print("File loaded. Length:", len(content))

# Since the previous run wrote to App.jsx, let's discard changes if we want to run again, but wait:
# Did the previous run corrupt the file by doing overlapping slices?
# Yes, it did: content[real_target_1_end:target_2_idx] is content[71975:69871] which is empty,
# and it deleted everything in between, and put replacement_2 before replacement_1!
# So App.jsx is currently corrupted.
# Fortunately, we can restore App.jsx from a backup if we have it, or by running `git checkout src/App.jsx`!
# Let's run a git checkout command to restore App.jsx first!

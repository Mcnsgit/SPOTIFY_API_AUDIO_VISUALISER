# gather_files.py

import os
import shutil

def gather_files():
    gather_dir = "gathered_files"
    if not os.path.exists(gather_dir):
        os.makedirs(gather_dir)

    file_extensions = [".py"]

    for root, dirs, files in os.walk("."):
        for file in files:
            if any(file.endswith(ext) for ext in file_extensions):
                file_path = os.path.join(root, file)
                shutil.copy(file_path, gather_dir)

if __name__ == "__main__":
    gather_files()

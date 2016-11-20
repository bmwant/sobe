import os
import uuid


def get_list_of_files(directory, ext='', full_path=True):
    files = []  # hehe, generators
    for file_name in os.listdir(directory):
        if file_name.endswith(ext):
            file_path = os.path.join(directory, file_name) \
                if full_path else file_name
            files.append(file_path)
    return files


def unique_filename(filename):
    name, ext = os.path.splitext(filename)
    new_name = uuid.uuid3(uuid.NAMESPACE_OID, filename.encode()).hex
    return new_name + ext


def main():
    folder = 'static'
    for filename in get_list_of_files(folder, '.jpg', full_path=False):
        new_name = unique_filename(filename)
        old_file = os.path.join(folder, filename)
        new_file = os.path.join(folder, new_name)
        os.rename(old_file, new_file)


if __name__ == '__main__':
    main()

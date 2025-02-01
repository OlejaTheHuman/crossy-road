import os

# Устанавливаем текущий рабочий каталог как директорию проекта
directory_path = os.getcwd()

# Имя файла для вывода всего кода
output_file_path = 'all_code.txt'

# Создаем или открываем файл для записи
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    # Проходимся по всем файлам в директории
    for root, dirs, files in os.walk(directory_path):
        # Исключаем директорию node_modules
        dirs[:] = [d for d in dirs if d != 'node_modules' and d != '.next']
        for file in files:
            # Проверяем, что файл имеет нужное расширение
            if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.css')):
                file_path = os.path.join(root, file)
                # Открываем и читаем файл
                with open(file_path, 'r', encoding='utf-8') as file:
                    # Читаем содержимое файла
                    content = file.read()
                    # Записываем содержимое в общий файл, добавляем разделитель между файлами
                    output_file.write(f'// File: {file_path}\n')
                    output_file.write(content)
                    output_file.write('\n\n')

print('Весь код был успешно скопирован в', output_file_path)

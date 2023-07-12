x = int(input('Masukkan angka: '))

for i in range(x):
    for j in range(i+1):
        print('*', end='')
    print('')

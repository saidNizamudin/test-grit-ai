def to_string(n, divider):
    if (n == 0):
        return ''
    
    unit = {
        1: 'Satu',
        2: 'Dua',
        3: 'Tiga',
        4: 'Empat',
        5: 'Lima',
        6: 'Enam',
        7: 'Tujuh',
        8: 'Delapan',
        9: 'Sembilan',
        10: 'Sepuluh',
        11: 'Sebelas',
        12: 'Dua Belas',
        13: 'Tiga Belas',
        14: 'Empat Belas',
        15: 'Lima Belas',
        16: 'Enam Belas',
        17: 'Tujuh Belas',
        18: 'Delapan Belas',
        19: 'Sembilan Belas',
    }
    
    digit = n//divider
    remainder = n%divider 
    if digit == 0:
        return to_string(remainder, divider//10)
    elif divider == 1000:
        return unit[digit] + " Ribu " + to_string(remainder, divider//10)
    elif digit == 1 and divider == 100:
        return 'Seratus ' + to_string(remainder, divider//10)
    elif divider == 100:
        return unit[digit] + " Ratus " + to_string(remainder, divider//10)
    elif divider == 10 and n >= 20:
        return unit[digit] + " Puluh " + to_string(remainder, divider//10)
    else:
        return unit[n]
    
angka = int(input("Masukkan angka: "))
print(to_string(angka,1000))
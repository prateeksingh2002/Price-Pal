import random
import matplotlib.pyplot as plt

def solve():
    print("ok")
    a = 5870
    b = a
    random_values = []

    for i in range(100):
        x = a + 0.005*a
        y = a - 0.005*a
        a = random.randint(int(y), int(x))
        if(a < b*0.8 or a> b*1.2):
            a = b
        random_values.append(a)
    
    plt.plot(random_values)
    plt.show()

    # for value in random_values:
    #     print(value)
        



    # with open('vector_data.txt', 'w') as file:
    #   for number in random_values:
  
    #     file.write(f'{number}\n')














        

if __name__ == "__main__":
    solve()

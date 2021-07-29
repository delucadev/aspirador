import random 
"""
    0 = > sujo
    1 => limpo

    MOVIMENTOS DO ROBÔ
    move para direita -> coluna ++
    move para esquerda -> coluna --
    move para cima -> linha -- 
    move para baixo -> linha ++

"""



def criaCasa(dime:tuple):
    casa = []
   
    for i in range(0,dime[0]):
        row  = []
        for y in range(0,dime[1]):
            row.append(random.randint(0,1))
        casa.append(row)
    return casa

def mostraCasa(casa:tuple):
    for x in range(0,len(casa)):
        
        for y in range(0,len(casa[0])):
            print(f"{casa[x][y]} \t",end="")
        print('\n')
def mostraRoboNaCasa(casa,posRobo:tuple):
    print("       ========posição robô na casa========")
    for x in range(0,len(casa)):
        
        for y in range(0,len(casa[0])):
            if posRobo[0] == x and posRobo[1] == y:
                print("\t R \t",end="")
                continue
            print(f"\t {casa[x][y]} \t",end="")
        print('\n')

def geraPosRoboRamdom(dime:tuple):
    posX = random.randint(0,dime[0] -1)
    posY = random.randint(0,dime[1] -1)

    return (posX,posY)

def moveRobo(posRobo:tuple,dimensao:tuple,casa):
    #verifica se da para mover para cima
    if posRobo[0]-1 >= 0:
        
        if casa[posRobo[0]-1][posRobo[1]] == 0:
            print('moveu para cima')
            #retorno a posição que robo vai ficar
            return (posRobo[0]-1,posRobo[1])
            #mover para cima
        else:
            print('em cima ta limpo')
    else:
        print('não pode mover para cima')
    #verifica se da para mover para baixo
    if posRobo[0]+1 < dimensao[0]:
        if casa[posRobo[0]+1][posRobo[1]] == 0:
            print('moveu para baixo')
            return (posRobo[0]+1,posRobo[1])
            #mover para baixo
        else:
            print('em baixo ta limpo')
    else:
        print('não pode mover para baixo')
    #verifica se da para mover para esquerda
    if posRobo[1]-1 >= 0:
        
        if casa[posRobo[0]][posRobo[1]-1] == 0:
            print('moveu para esquerda')
            return (posRobo[0],posRobo[1]-1)
            #mover para esquerda
        else:
            print('a esquerda ta limpa')
    else:
        print('não pode mover para esquerda')
    #verifica se da para mover para direita
    if posRobo[1]+1 < dimensao[1]:
        
        if casa[posRobo[0]][posRobo[1]+1] == 0:
            print('moveu para direita')
            return (posRobo[0],posRobo[1]+1)
            #mover para direita
        else:
            print('a direita ta limpa')
    else:
        print('não pode mover para direita')
    print(" 'aparentimento ta tudo limpo'\n robô:ZZZzzzzZzzz")
    return None

def limparCasa(casa,posRobo,dimensao):
    print("Posição atual do robô -> "+str(posRobo))
    #limpar na posição do robo
    casa[posRobo[0]][posRobo[1]] = 1
    novaPosRobo = moveRobo(posRobo,dimensao,casa)
    if novaPosRobo:
        print("robo moveu para ->"+str(novaPosRobo))
        limparCasa(casa,novaPosRobo,dimensao)
    else:
        return 
        



def main():
    x = 5 #linhas
    y = 5 #colunas
    dimensao = (x,y)
    casa = criaCasa(dimensao)
    posRobo = geraPosRoboRamdom(dimensao)
    mostraCasa(casa)
    mostraRoboNaCasa(casa,posRobo)
    limparCasa(casa,posRobo,dimensao)
    mostraCasa(casa)
    



if __name__ == '__main__':
    main()
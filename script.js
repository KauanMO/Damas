let gametype, turndisplay, turn, possibleEated

document.querySelectorAll('#gametypeopt').forEach(opt => {
    opt.addEventListener('click', () => {
        gametype = opt.getAttribute('gtype')
        if (gametype == 'pve') {
            alert('No futuro (talvez muito distante) juro que vou aprender IA e implementar no jogo, mas por enquanto, se contente com 2 jogadores, obrigado! =)')
        } else {
            document.querySelector('.form').style.opacity = '0'
            setTimeout(() => {
                document.querySelector('.form').style.display = 'none'
                start()
            }, 300);
        }
    })
})

function start() {
    document.querySelector('.game').style.display = 'flex'
    setTimeout(() => {
        document.querySelector('.game').style.opacity = '1'
    }, 100);
    createBoard()
}

function createBoard() {
    const board = document.querySelector('.board')
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            const square = document.createElement('div')
            square.classList.add('square')
            square.classList.add(`x${i}`)
            square.classList.add(`y${x}`)
            board.appendChild(square);
        }
    }
    createCheckers()
}

function createCheckers() {
    let squares = document.querySelectorAll('.square')
    squares.forEach(square => {
        const checker = document.createElement('div')
        checker.classList.add('checker')
        checker.addEventListener('click', () => {
            checkTurn(checker)
        })
        if (square.classList.contains('x0') || square.classList.contains('x1')) {
            checker.classList.add('black')
            square.appendChild(checker)
        } else if (square.classList.contains('x6') || square.classList.contains('x7')) {
            checker.classList.add('white')
            square.appendChild(checker)
        }
    })

    document.querySelector('.container').appendChild(turndisplay = document.createElement('span'))
    turndisplay.id = 'turndisplay'
    setTimeout(() => {
        turndisplay.style.opacity = '1'
        turn = 'white'

        turndisplay.innerHTML = `Turno: ${turn}`
    }, 100);
}

function checkTurn(checker) {
    if (!checker.classList.contains(turn)) {
        alert('Não é o seu turno')
    } else {
        checkOptions(checker)
    }
}

function checkOptions(checker) {
    possibleEated = undefined
    possibleOptions = document.querySelector('.possibleOption')
    if (possibleOptions) {
        possibleOptions.classList.remove('possibleOption')
    }

    position = checker.parentNode.classList
    checkDiagonals(position)

    if (turn == 'white') {
        x = Number(position[1].replace('x', '')) - 1
    } else {
        x = Number(position[1].replace('x', '')) + 1
    }
    y = position[2].replace('y', '')

    possibleOption = document.querySelector(`.x${x}.y${y}`)
    if (possibleOption.hasChildNodes()) {
        possibleEated = possibleOption
        if (turn == 'white') {
            possibleOption = document.querySelector(`.x${x - 1}.y${y}`)
        } else {
            possibleOption = document.querySelector(`.x${x + 1}.y${y}`)
        }
    }
    possibleOption.classList.add('possibleOption')

    possibleOption.addEventListener('click', () => {
        checker.parentNode.innerHTML = ''
        possibleOption.appendChild(checker)
        possibleOption.classList.remove('possibleOption')

        if (possibleEated) {
            possibleEated.innerHTML = ''
            possibleEated = undefined
        } else {
            if (turn == 'white') {
                turn = 'black'
            } else {
                turn = 'white'
            }
        }
        turndisplay.innerHTML = `Turno: ${turn}`
    }, { once: true })
}

function checkDiagonals(position) {
    if (turn == 'white') {
        x = Number(position[1].replace('x', '')) - 1
    } else {
        x = Number(position[1].replace('x', '')) + 1
    }
    y1 = Number(position[2].replace('y', '')) - 1
    y2 = Number(position[2].replace('y', '')) + 1

    let possibleOption1 = document.querySelector(`.x${x}.y${y1}`)
    let possibleOption2 = document.querySelector(`.x${x}.y${y2}`)

    if(possibleOption1.hasChildNodes() || possibleOption2.hasChildNodes()){
        possibleEated = possibleOption1.firstChild
    }
}
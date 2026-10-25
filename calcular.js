const calcular = (num1, num2, operacion) => {
    let resultado;
    if(operacion === 'somar') {
        resultado = num1 + num2 

    }else if(operacion === 'subtrair') {
        resultado = num1 - num2          

    }else if(operacion === 'multiplicar') {
        resultado = num1 * num2 

    }else if(operacion === 'dividir' ) {
        
        if (num2 === 0) {
            throw new Error('Divisão por zero não é permitida');
        }

        resultado = num1 / num2 
        
    }else {
        throw new Error('Operação inválida');
    }

    if(!Number.isFinite(resultado)) {
                throw new Error('Resultado não é um número finito');
                
            }
        
    
    return resultado;
    }


    

module.exports = { calcular };
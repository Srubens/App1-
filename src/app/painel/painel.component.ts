import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {

	public frases: Frase[] = FRASES
	public tituloPainel:string = 'Traduza a frase:'
	public resposta:string

	public rodada:number = 0
	public rodadaFrase:Frase
	public progresso:number = 0

	public tentativas: number = 3

	@Output() public encerrarJogo:EventEmitter<string> = new EventEmitter

	// public load:string = '/assets/loader.gif'

	ngOnDestroy(){
		// console.log('o component painel foi destruido!')
	}

	constructor(){
		this.atualizaRodada()
		// this.rodadaFrase = this.frases[this.rodada]
		// console.log(this.rodadaFrase)
	}

	public atualizaResposta(resposta:Event):void{
		// console.log((<HTMLInputElement>resposta.target).value)
		this.resposta = ((<HTMLInputElement>resposta.target).value)
		// console.log(this.resposta)
	}

	public verificaResposta():void{
		// console.log(this.tentativas)

		if(this.rodadaFrase.frasePtBr == this.resposta){
			alert('A tradução esta correta!')
			// console.log('Verifica resposta: ', this.resposta)
			
			//trocar pergunta da rodada
			this.rodada++

			//progresso
			this.progresso = this.progresso + (100 / this.frases.length)
			// console.log(this.progresso)

			//verificação de tentativas completas com sucesso
			if(this.rodada === 10){
				// alert('Pabéns! Você conseguiu finalizar com sucesso! :D')
				this.encerrarJogo.emit('vitoria')
			}

			//atualiza a frase da rodada
			this.atualizaRodada()
			// console.log(this.rodadaFrase)
		}else{
			alert('Você errou a tradução')
			//diminuir as tentativas
			this.tentativas--
			// console.log('tentativas:', this.tentativas)
			if(this.tentativas === -1){
				// alert('GAME OVER!\n Você perdeu todas as tentativas')
				this.encerrarJogo.emit('derrota')
			}
		}

		// console.log(this.tentativas)

	}

	public atualizaRodada():void{
		//atualiza a frase da rodada
		this.rodadaFrase = this.frases[this.rodada]
		//limpa o textaera
		this.resposta = ''
	}

}

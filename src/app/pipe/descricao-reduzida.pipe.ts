import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, range: number): string{
        if(texto.length > range){
            return texto.substr(0, range) + '...'
        } else{
            return texto
        }
    }

}
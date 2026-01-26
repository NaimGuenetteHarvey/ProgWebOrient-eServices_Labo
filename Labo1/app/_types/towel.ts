export class Towel{
 public wet : boolean = false
 constructor(

    public color: String,
    public lenght : number,
    public image : string,
   

 ){}
 use(): string{
    if (this.wet == true)
    {
       return "La cible est maintenant sèche"

    }
    return "Ça ne fonctionne pas..."
    
 }

}
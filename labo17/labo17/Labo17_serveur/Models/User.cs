using Microsoft.AspNetCore.Identity;

namespace Labo17_serveur.Models
{
    public class User : IdentityUser
    {
        
        public virtual List<Anime> Animes { get; set; } = new List<Anime>();

    }
}

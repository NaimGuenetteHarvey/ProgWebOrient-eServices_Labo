using System.Text.Json.Serialization;

namespace Labo17_serveur.Models
{
    public class Anime
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; } = null!;
        public virtual List<string> Genres { get; set; } = new List<string>();
        public virtual string? ImageUrl { get; set; }

        [JsonIgnore]
        public virtual List<User> Users { get; set; } = new List<User>();
    }
}

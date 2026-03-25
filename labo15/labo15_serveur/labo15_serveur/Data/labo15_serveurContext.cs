using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using labo15_serveur.Models;

namespace labo15_serveur.Data
{
    public class labo15_serveurContext : DbContext
    {
        public labo15_serveurContext (DbContextOptions<labo15_serveurContext> options)
            : base(options)
        {
        }

        public DbSet<labo15_serveur.Models.Item> Item { get; set; } = default!;
    }
}

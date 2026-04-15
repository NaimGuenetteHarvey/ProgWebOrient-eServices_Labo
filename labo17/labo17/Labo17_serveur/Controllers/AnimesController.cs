using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Labo17_serveur.Data;
using Labo17_serveur.Models;
using Labo17_serveur.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Labo17_serveur.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AnimesController : ControllerBase
    {
        private readonly Labo17_serveurContext _context;
        private readonly AnimeService _animeService;
        private readonly UserManager<User> _userManager;

        public AnimesController(Labo17_serveurContext context, AnimeService animeService, UserManager<User> userManager)
        {
            _context = context;
            _animeService = animeService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anime>>> GetAnime()
        {
            return Ok(await _animeService.GetAll());
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Anime>>> GetMyAnimes()
        {

            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (user == null) return Unauthorized();

            return user.Animes;
         
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Anime>> PostAnime(Anime anime)
        {


            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (user == null)
            {
                return Unauthorized();
            }

            anime.Users.Add(user);

            _context.Anime.Add(anime);
            await _context.SaveChangesAsync();

            return Ok(anime);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> SubscribeAnime(int id)
        {
            

            return Ok(/*new { Message = anime.Users.Contains(user) ? "Animé ajouté !" : "Anime retiré !" }*/);
        }
    }
}

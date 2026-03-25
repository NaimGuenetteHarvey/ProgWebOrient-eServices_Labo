using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using labo15_serveur.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<labo15_serveurContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("labo15_serveurContext") ?? throw new InvalidOperationException("Connection string 'labo15_serveurContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

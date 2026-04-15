using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Labo17_serveur.Migrations
{
    /// <inheritdoc />
    public partial class nomDeVotreMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnimeUser",
                columns: table => new
                {
                    AnimesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimeUser", x => new { x.AnimesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_AnimeUser_Anime_AnimesId",
                        column: x => x.AnimesId,
                        principalTable: "Anime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnimeUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimeUser_UsersId",
                table: "AnimeUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimeUser");
        }
    }
}

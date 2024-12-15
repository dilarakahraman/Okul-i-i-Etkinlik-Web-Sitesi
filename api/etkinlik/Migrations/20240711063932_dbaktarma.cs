using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace etkinlik.Migrations
{
    public partial class dbaktarma : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "detays",
                columns: table => new
                {
                    detay_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    resim = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kategori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    aciklama = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    saat = table.Column<float>(type: "real", nullable: false),
                    fiyat = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_detays", x => x.detay_id);
                });

            migrationBuilder.CreateTable(
                name: "etkinlikOlusturs",
                columns: table => new
                {
                    olusturma_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    aciklamasi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    resmi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etkinlikOlusturs", x => x.olusturma_id);
                });

            migrationBuilder.CreateTable(
                name: "signups",
                columns: table => new
                {
                    Sign_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kullanici_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sifre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_signups", x => x.Sign_id);
                });

            migrationBuilder.CreateTable(
                name: "anaSayfas",
                columns: table => new
                {
                    etkinlik_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    etkinlik_resmi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    etkinlik_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    etkinlik_tarih = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    detay_id = table.Column<int>(type: "int", nullable: false),
                    detay_id1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_anaSayfas", x => x.etkinlik_id);
                    table.ForeignKey(
                        name: "FK_anaSayfas_detays_detay_id1",
                        column: x => x.detay_id1,
                        principalTable: "detays",
                        principalColumn: "detay_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "logins",
                columns: table => new
                {
                    Login_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kullanici_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sifre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    signupSign_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_logins", x => x.Login_id);
                    table.ForeignKey(
                        name: "FK_logins_signups_signupSign_id",
                        column: x => x.signupSign_id,
                        principalTable: "signups",
                        principalColumn: "Sign_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_anaSayfas_detay_id1",
                table: "anaSayfas",
                column: "detay_id1");

            migrationBuilder.CreateIndex(
                name: "IX_logins_signupSign_id",
                table: "logins",
                column: "signupSign_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "anaSayfas");

            migrationBuilder.DropTable(
                name: "etkinlikOlusturs");

            migrationBuilder.DropTable(
                name: "logins");

            migrationBuilder.DropTable(
                name: "detays");

            migrationBuilder.DropTable(
                name: "signups");
        }
    }
}

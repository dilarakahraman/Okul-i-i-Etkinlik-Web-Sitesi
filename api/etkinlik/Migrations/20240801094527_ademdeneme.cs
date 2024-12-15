using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace etkinlik.Migrations
{
    public partial class ademdeneme : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "anaSayfas");

            migrationBuilder.DropTable(
                name: "detays");

            migrationBuilder.DropTable(
                name: "etkinlikOlusturs");

            migrationBuilder.DropTable(
                name: "logins");

            migrationBuilder.DropTable(
                name: "signups");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    EventID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "EventTransactions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    EventID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTransactions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "EventTransactions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.CreateTable(
                name: "anaSayfas",
                columns: table => new
                {
                    etkinlik_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    detay_id = table.Column<int>(type: "int", nullable: false),
                    etkinlik_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    etkinlik_resmi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    etkinlik_tarih = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_anaSayfas", x => x.etkinlik_id);
                });

            migrationBuilder.CreateTable(
                name: "detays",
                columns: table => new
                {
                    detay_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    aciklama = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fiyat = table.Column<float>(type: "real", nullable: false),
                    kategori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    resim = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    saat = table.Column<float>(type: "real", nullable: false),
                    tarih = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                    aciklamasi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    resmi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tarihi = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etkinlikOlusturs", x => x.olusturma_id);
                });

            migrationBuilder.CreateTable(
                name: "logins",
                columns: table => new
                {
                    login_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kullanici_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sifre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sign_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_logins", x => x.login_id);
                });

            migrationBuilder.CreateTable(
                name: "signups",
                columns: table => new
                {
                    sign_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kullanici_adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sifre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_signups", x => x.sign_id);
                });
        }
    }
}

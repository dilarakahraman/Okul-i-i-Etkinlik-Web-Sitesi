using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace etkinlik.Migrations
{
    public partial class anasayfaguncel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_anaSayfas_detays_detay_id1",
                table: "anaSayfas");

            migrationBuilder.DropForeignKey(
                name: "FK_logins_signups_signupSign_id",
                table: "logins");

            migrationBuilder.DropIndex(
                name: "IX_logins_signupSign_id",
                table: "logins");

            migrationBuilder.DropIndex(
                name: "IX_anaSayfas_detay_id1",
                table: "anaSayfas");

            migrationBuilder.DropColumn(
                name: "detay_id1",
                table: "anaSayfas");

            migrationBuilder.RenameColumn(
                name: "Sifre",
                table: "signups",
                newName: "sifre");

            migrationBuilder.RenameColumn(
                name: "Mail",
                table: "signups",
                newName: "mail");

            migrationBuilder.RenameColumn(
                name: "Kullanici_adi",
                table: "signups",
                newName: "kullanici_adi");

            migrationBuilder.RenameColumn(
                name: "Sign_id",
                table: "signups",
                newName: "sign_id");

            migrationBuilder.RenameColumn(
                name: "Sifre",
                table: "logins",
                newName: "sifre");

            migrationBuilder.RenameColumn(
                name: "Kullanici_adi",
                table: "logins",
                newName: "kullanici_adi");

            migrationBuilder.RenameColumn(
                name: "Login_id",
                table: "logins",
                newName: "login_id");

            migrationBuilder.RenameColumn(
                name: "signupSign_id",
                table: "logins",
                newName: "sign_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sifre",
                table: "signups",
                newName: "Sifre");

            migrationBuilder.RenameColumn(
                name: "mail",
                table: "signups",
                newName: "Mail");

            migrationBuilder.RenameColumn(
                name: "kullanici_adi",
                table: "signups",
                newName: "Kullanici_adi");

            migrationBuilder.RenameColumn(
                name: "sign_id",
                table: "signups",
                newName: "Sign_id");

            migrationBuilder.RenameColumn(
                name: "sifre",
                table: "logins",
                newName: "Sifre");

            migrationBuilder.RenameColumn(
                name: "kullanici_adi",
                table: "logins",
                newName: "Kullanici_adi");

            migrationBuilder.RenameColumn(
                name: "login_id",
                table: "logins",
                newName: "Login_id");

            migrationBuilder.RenameColumn(
                name: "sign_id",
                table: "logins",
                newName: "signupSign_id");

            migrationBuilder.AddColumn<int>(
                name: "detay_id1",
                table: "anaSayfas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_logins_signupSign_id",
                table: "logins",
                column: "signupSign_id");

            migrationBuilder.CreateIndex(
                name: "IX_anaSayfas_detay_id1",
                table: "anaSayfas",
                column: "detay_id1");

            migrationBuilder.AddForeignKey(
                name: "FK_anaSayfas_detays_detay_id1",
                table: "anaSayfas",
                column: "detay_id1",
                principalTable: "detays",
                principalColumn: "detay_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_logins_signups_signupSign_id",
                table: "logins",
                column: "signupSign_id",
                principalTable: "signups",
                principalColumn: "Sign_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

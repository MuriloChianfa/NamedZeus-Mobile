using Microsoft.EntityFrameworkCore.Migrations;

namespace NamedZeusAPI.Migrations
{
    public partial class AdjustingModels1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Server_Snmp_SNMPForeignKey",
                table: "Server");

            migrationBuilder.DropIndex(
                name: "IX_Server_SNMPForeignKey",
                table: "Server");

            migrationBuilder.RenameColumn(
                name: "SNMPForeignKey",
                table: "Server",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Snmp",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SNMPId",
                table: "Server",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Snmp");

            migrationBuilder.DropColumn(
                name: "SNMPId",
                table: "Server");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Server",
                newName: "SNMPForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Server_SNMPForeignKey",
                table: "Server",
                column: "SNMPForeignKey");

            migrationBuilder.AddForeignKey(
                name: "FK_Server_Snmp_SNMPForeignKey",
                table: "Server",
                column: "SNMPForeignKey",
                principalTable: "Snmp",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

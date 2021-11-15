using System.Net;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NamedZeusAPI.Migrations
{
    public partial class ChangingTypeOfIPAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IPAddress",
                table: "Server",
                type: "text",
                nullable: false,
                oldClrType: typeof(IPAddress),
                oldType: "inet");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<IPAddress>(
                name: "IPAddress",
                table: "Server",
                type: "inet",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}

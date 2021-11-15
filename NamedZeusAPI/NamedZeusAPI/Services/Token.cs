using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NamedZeusAPI.Models;
using NamedZeusAPI.Conf;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

namespace NamedZeusAPI.Services
{
    public sealed class Token
    {
        /// <summary>Receive the user and bind your data in JWT Bearer based token.</summary>
        /// <param name="user"></param>
        /// <returns>Returns the JWT Bearer based token as a string type for send to the client</returns>
        public static string GenerateToken(User user)
        {
            return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
                expires: DateTime.Now.AddHours(Constants.TOKEN_VALID_TIME),             // Time to expire getted from constants
                claims: new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),  // UniqueID to this token
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),           // ID of user to this token
                    new Claim(ClaimTypes.Name, user.Name.ToString()),                   // Name of user to this token
                    new Claim(ClaimTypes.Email, user.Email.ToString())                  // Email of user to this token
                },
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.SECRET)), // Secret token getted from constants
                SecurityAlgorithms.HmacSha256)                                          // Encrypted with SHA256
            ));
        }
    }
}

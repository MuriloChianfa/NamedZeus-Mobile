using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NamedZeusAPI.Models
{
    public class SNMP
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Version is required!")]
        [Range(2, 3, ErrorMessage = "The version must be 2 or 3!")]
        public int Version { get; set; } = 3;

        [Required(ErrorMessage = "User is required!")]
        [MaxLength(16, ErrorMessage = "The user must be between 8 and 16 characters for security reasons!"), MinLength(8)]
        public string User { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        [MaxLength(16, ErrorMessage = "The password must be between 8 and 16 characters for security reasons!"), MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public int UserId { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string CreatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string UpdatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
    }
}

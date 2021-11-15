using System;
using System.ComponentModel.DataAnnotations;

namespace NamedZeusAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [MaxLength(255, ErrorMessage = "The name must be 255 characters only!"), MinLength(1)]
        public string Name { get; set; }

        [Required(ErrorMessage = "The E-mail is required!")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "The password is required!")]
        [MaxLength(255, ErrorMessage = "The password must be 8-255 characters!"), MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.MultilineText)]
        [MaxLength]
        public string Avatar { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string CreatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string UpdatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
    }
}

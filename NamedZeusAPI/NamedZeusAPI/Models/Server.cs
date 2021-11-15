using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace NamedZeusAPI.Models
{
    public class Server
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [MaxLength(255, ErrorMessage = "The name must be 255 characters only!"), MinLength(1)]
        public string Name { get; set; }

        [Required(ErrorMessage = "IPAddress is required!")]
        [RegularExpression(@"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$", ErrorMessage = "Please provide one valid IPAddress!")]
        public string IPAddress { get; set; }

        [Required(ErrorMessage = "Netflow port is required!")]
        [Range(1024, 65535, ErrorMessage = "The netflow port must be between 1024 and 65535!")]
        public int NetflowPort { get; set; }

        public int SNMPId { get; set; }
        public int UserId { get; set; }

        public bool HealthCheck { get; set; } = false;

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string CreatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public string UpdatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
    }
}

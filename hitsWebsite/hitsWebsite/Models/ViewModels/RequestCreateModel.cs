﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace hitsWebsite.Models
{
    public class RequestCreateModel
    {
        [Required]
        public String Name { get; set; }

        [Required]
        [EmailAddress]
        public String Email { get; set; }
    }
}

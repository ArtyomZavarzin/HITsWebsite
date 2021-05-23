﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace hitsWebsite.Models.ViewModels
{
    public class HumanEditModel
    {
        public List<String> Name { get; set; }
        public List<String> Description { get; set; }
        public List<String> Language { get; set; }

        public IFormFile Picture { get; set; }
    }
}

﻿using hitsWebsite.Models;
using hitsWebsite.Models.ViewModels;
using hitsWebsite.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hitsWebsite.Controllers
{
    [Authorize(Roles = ApplicationRoles.Administrators)]
    public class AboutController : Controller
    {
        private readonly IDataProviderService _dataProviderService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AboutController(IDataProviderService dataProviderService, UserManager<ApplicationUser> userManager)
        {
            _dataProviderService = dataProviderService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        #region C*UD Feature
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateFeature(FeatureEditModel model)
        {
            if (ModelState.IsValid)
            {
                await _dataProviderService.CreateFeature(model);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditFeature(String id, FeatureEditModel model)
        {
            if (ModelState.IsValid && id != null)
            {
                await _dataProviderService.EditFeature(id, model);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteFeature(String id)
        {
            if (id != null)
            {
                await _dataProviderService.DeleteFeature(id);
            }

            return RedirectToAction("Index");
        }
        #endregion


        #region C*UD Human
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateHuman(HumanCreateModel model)
        {
            if (ModelState.IsValid)
            {
                await _dataProviderService.CreateHuman(model);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditHuman(String id, HumanEditModel model)
        {
            if (ModelState.IsValid)
            {
                await _dataProviderService.EditHuman(id, model);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteHuman(String id)
        {
            if (id != null)
            {
                await _dataProviderService.DeleteHuman(id);
            }

            return RedirectToAction("Index");
        }
        #endregion


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditAchievements(AchievementsEditModel model)
        {
            if (ModelState.IsValid)
            {
                await _dataProviderService.EditAchievement(model);
            }

            return RedirectToAction("Index");
        }

    }
}

using etkinlik.Context;
using etkinlik.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using etkinlik.DTO;

namespace etkinlik.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSignController : ControllerBase
    {
        private readonly TutorialDbContext _tutorialDbContext;

        public UserSignController(TutorialDbContext tutorialDbContext)
        {
            _tutorialDbContext = tutorialDbContext;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                var checkUser = await _tutorialDbContext.Users.Where(x => x.Email == user.Email).FirstOrDefaultAsync();
                if (checkUser != null)
                {
                    return Conflict("The user already exist !");
                }

                var res = await _tutorialDbContext.AddAsync(user);
                var change = await _tutorialDbContext.SaveChangesAsync();
                if (change > 0)
                {
                    var addedUser = await _tutorialDbContext.Users.OrderByDescending(x => x.ID).FirstOrDefaultAsync();
                    return Ok(addedUser);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserDto loginUserDto)
        {
            try
            {
                var user = await _tutorialDbContext.Users
                    .Where(x => x.Email == loginUserDto.Email && x.Password == loginUserDto.Password)
                    .FirstOrDefaultAsync();

                if(user != null)
                {
                    UserSignDto signUser = new UserSignDto();
                    signUser.Name = user.Name;
                    signUser.Surname = user.Surname;
                    signUser.Email = user.Email;
                    signUser.Password = user.Password;
                    signUser.CreateDate = user.CreateDate.ToString();
                    signUser.Phone = user.Phone;
                    return Ok(signUser);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}

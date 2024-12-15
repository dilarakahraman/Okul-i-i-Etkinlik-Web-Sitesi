using etkinlik.Context;
using etkinlik.DTO;
using etkinlik.Models;
// using etkinlik.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace etkinlik.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtkinlikController : ControllerBase
    {
        private readonly TutorialDbContext _tutorialDbContext;

        public EtkinlikController(TutorialDbContext tutorialDbContext)
        {
            _tutorialDbContext = tutorialDbContext;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllEtkinlik()
        {
            try
            {
                var res = await _tutorialDbContext.Events.Where(x => x.IsActive).OrderBy(x => x.Date).ToListAsync();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetEtkinlikById(int id)
        {
            try
            {
                // Verilen ID'ye sahip etkinliği bul
                var etkinlik = await _tutorialDbContext.Events.FirstOrDefaultAsync(e => e.ID == id && e.IsActive);

                // Eğer etkinlik bulunamadıysa 404 Not Found döndür
                if (etkinlik == null)
                {
                    return NotFound(new { message = "Etkinlik bulunamadı" });
                }

                // Etkinlik bulunduysa 200 OK ile birlikte etkinliği döndür
                return Ok(etkinlik);
            }
            catch (Exception ex)
            {
                // Hata durumunda 500 Internal Server Error döndür
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateEtkinlik([FromBody] CreateEventDto createEventDto)
        {
            try
            {
                Event newEvent = new Event()
                {
                    Name = createEventDto.Name,
                    Amount = createEventDto.Amount,
                    CreateDate = DateTime.Now,
                    Date = createEventDto.Date,
                    Description = createEventDto.Description,
                    Image = createEventDto.Image,
                    Price = createEventDto.Price,
                    IsActive = true
                };

                var res = await _tutorialDbContext.AddAsync(newEvent);
                var change = await _tutorialDbContext.SaveChangesAsync();
                if (change > 0)
                {
                    var addedEvent = await _tutorialDbContext.Events.Where(x => x.IsActive).OrderByDescending(x => x.ID).FirstOrDefaultAsync();
                    return Ok(addedEvent);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                var res = await _tutorialDbContext.Events.Where(x => x.ID == id && x.IsActive).FirstOrDefaultAsync();
                if (res != null)
                {
                    res.IsActive = false;
                    var change = await _tutorialDbContext.SaveChangesAsync();

                    if (change > 0)
                    {
                        return Ok(); // Başarıyla silindiğinde 200 OK döndür
                    }

                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("AddToCart")]      // sepete ekle
        public async Task<IActionResult> AddToCartEvent([FromQuery] int userId, int eventId, int amount)
        {
            try
            {
                Cart addToCart = new Cart()
                {
                    UserID = userId,
                    EventID = eventId,
                    Amount = amount
                };
                var res = await _tutorialDbContext.AddAsync(addToCart);
                var change = await _tutorialDbContext.SaveChangesAsync();
                if (change > 0)
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        [HttpGet("CartList")] // sepettekileri göster
        public async Task<IActionResult> GetCartList([FromQuery] int userId)        //hangi kullanıcı giriş yapmışsa onunkileri göstersin diye kullanıcı adı istiyor
        {
            try
            {
                var res = await _tutorialDbContext.Carts.Where(x => x.UserID == userId).ToListAsync();
                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("BuyToCart")]          //Sepeti onayla tuşuna (Katıl) basınca satın alma işlemini gerçekleştiren fonksiyon
        public async Task<IActionResult> ButCart([FromQuery] int userId)
        {
            try
            {
                var res = await _tutorialDbContext.Carts.Where(x => x.UserID == userId).ToListAsync();
                List<EventTransaction> eventLists = new List<EventTransaction>();

                foreach (var evt in res)
                {
                    EventTransaction eventTransaction = new EventTransaction()
                    {
                        UserID = evt.UserID,
                        EventID = evt.EventID,
                        Amount = evt.Amount,
                        CreateDate = DateTime.Now
                    };
                    eventLists.Append(eventTransaction);
                }

                _tutorialDbContext.EventTransactions.AddRange(eventLists);

                var change = await _tutorialDbContext.SaveChangesAsync();
                if (change > 0)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("GetPaidEvents")]      //satın alınmış eventlerin listesi
        public async Task<IActionResult> PaidEventList([FromQuery] int userId)
        {
            try
            {
                var res = await (from et in _tutorialDbContext.EventTransactions
                                 join e in _tutorialDbContext.Events on et.EventID equals e.ID
                                 where et.UserID == userId
                                 select e).ToListAsync();

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }



        /*[HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateEtkinlik(int id, [FromBody] EtkinlikOlustur updatedEtkinlik)
        {
            try
            {
                var existingEtkinlik = await _tutorialDbContext.etkinlikOlusturs.FindAsync(id);

                if (existingEtkinlik == null)
                {
                    return NotFound(); // Kullanıcı bulunamazsa 404 Not Found döndür
                }

                // Güncelleme işlemleri
                existingEtkinlik.adi = updatedEtkinlik.adi;
                existingEtkinlik.aciklamasi = updatedEtkinlik.aciklamasi;
                existingEtkinlik.resmi = updatedEtkinlik.resmi;
                existingEtkinlik.tarihi = updatedEtkinlik.tarihi;

                _tutorialDbContext.etkinlikOlusturs.Update(existingEtkinlik);
                var change = await _tutorialDbContext.SaveChangesAsync();

                if (change > 0)
                {
                    return Ok(existingEtkinlik); // Başarıyla güncellendiğinde güncellenen kullanıcıyı ve 200 OK döndür
                }

                return BadRequest(); // Bir hata oluştuysa 400 Bad Request döndür
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); // İçsel bir hata oluştuysa 500 Internal Server Error döndür
            }
        }*/
    }
}

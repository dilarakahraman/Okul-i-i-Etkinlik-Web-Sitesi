namespace etkinlik.DTO;

public class CreateEventDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }  // etkinlik tarihi
    public string Image { get; set; }
    public float Price { get; set; }
    public int Amount { get; set; } // etkinlik bilet miktarı 
}
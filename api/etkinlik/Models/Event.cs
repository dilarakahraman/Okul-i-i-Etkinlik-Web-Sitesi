namespace etkinlik.Models;

public class Event
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreateDate { get; set; } // etkinlik oluşturulma tarihi
    public DateTime Date { get; set; }  // etkinlik tarihi
    public bool IsActive { get; set; }
    public string Image { get; set; }
    public float Price { get; set; }
    public int Amount { get; set; } // etkinlik bilet miktarı 
}
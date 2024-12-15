namespace etkinlik.Models;

public class Cart
{
    public int ID { get; set; }
    public int UserID { get; set; }
    public int EventID { get; set; }
    public int Amount { get; set; } //miktar - adet
}
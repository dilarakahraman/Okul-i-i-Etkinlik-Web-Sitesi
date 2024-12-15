namespace etkinlik.Models;

public class EventTransaction       // satın alındıktan sonra burada listelenecek alınanlar
{
    public int ID { get; set; }
    public int UserID { get; set; }
    public int EventID { get; set; }
    public int Amount { get; set; } //miktar - adet
    public DateTime CreateDate { get; set; }  // satın alınma tarihini tutmak için 

}
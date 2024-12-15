namespace etkinlik.Models;

public class User
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreateDate { get; set; }
}
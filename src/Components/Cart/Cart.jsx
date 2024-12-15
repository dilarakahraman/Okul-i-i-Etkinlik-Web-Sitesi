import React from 'react';

const Cart = ({ cart, removeFromCart, user }) => {
    
    // Toplam fiyatı hesaplayan fonksiyon
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    // Ürünü sepete ekleme fonksiyonu (giriş kontrolü içerir)
    const addToCart = (item) => {
        if (!user) {
            alert('Ürün eklemek için giriş yapmalısınız!'); // Kullanıcı giriş yapmadıysa uyarı ver
            return; // İşlem durdurulsun
        }
        // Sepete ekleme işlemi burada yapılacak (örn. API isteğiyle)
        // Bu alan kullanıcı giriş yaptıysa çalışacak.
    };

    return (
        <div className="cart-container">
            <h2>Sepet</h2>
            {cart.length === 0 ? (
                <p>Sepetinizde ürün yok.</p>
            ) : (
                <>
                    {/* Sepetteki her ürünü listeleme */}
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Fiyat: {item.price} TL</p>
                            </div>
                            {/* Ürünü sepetten silme */}
                            <button onClick={() => removeFromCart(index)} className="remove-button">Sil</button>
                        </div>
                    ))}

                    {/* Toplam fiyat */}
                    <div className="total-price">
                        <h3>Toplam Fiyat: {calculateTotalPrice()} TL</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;

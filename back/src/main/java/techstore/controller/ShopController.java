
package techstore.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;

@Controller
public class ShopController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

 
    @PostMapping("/add-cart")
    @ResponseBody
    public int addCart(@RequestParam int id, HttpSession session) {

        List<Integer> cart = (List<Integer>) session.getAttribute("cart");

        if (cart == null) {
            cart = new ArrayList<>();
        }

        cart.add(id);

        session.setAttribute("cart", cart);

        return cart.size();
    }

    

    @GetMapping("/cart-count")
    @ResponseBody
    public int getCartCount(HttpSession session) {

        Integer count = (Integer) session.getAttribute("cartCount");

        if (count == null) {
            return 0;
        }

        return count;
    }
}

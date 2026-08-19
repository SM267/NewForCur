import java.util.Map;
import java.util.Scanner;

public class CurrencyConverter {
    private static final Map<String, Double> TO_USD = Map.of(
        "INR", 0.0119,
        "USD", 1.0,
        "EUR", 1.08,
        "GBP", 1.27,
        "JPY", 0.0068
    );

    public static double convert(double amount, String from, String to) {
        if (amount < 0 || !TO_USD.containsKey(from) || !TO_USD.containsKey(to)) {
            throw new IllegalArgumentException("Invalid amount or currency");
        }
        return amount * TO_USD.get(from) / TO_USD.get(to);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Amount: ");
        double amount = scanner.nextDouble();
        System.out.print("From (INR/USD/EUR/GBP/JPY): ");
        String from = scanner.next().toUpperCase();
        System.out.print("To (INR/USD/EUR/GBP/JPY): ");
        String to = scanner.next().toUpperCase();

        try {
            System.out.printf("Result: %.2f %s%n", convert(amount, from, to), to);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
        scanner.close();
    }
}

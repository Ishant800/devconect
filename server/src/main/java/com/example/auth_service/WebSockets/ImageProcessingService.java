package com.example.auth_service.WebSockets;

// service/ImageProcessingService.java (Improved Version)


import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;

public class ImageProcessingService {

    public byte[] processImage(byte[] inputData) {
        try {
            // 🔍 Detect original image format (JPEG, PNG, etc.)
            String format = detectImageFormat(inputData);
            if (format == null) {
                // Not a valid image → return raw data
                return inputData;
            }

            // Read image
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(inputData));
            if (img == null) return inputData;

            // Optional: Resize only if too large (e.g., >800px)
            int maxWidth = 800;
            if (img.getWidth() > maxWidth) {
                double ratio = (double) maxWidth / img.getWidth();
                int newHeight = (int) (img.getHeight() * ratio);
                Image scaled = img.getScaledInstance(maxWidth, newHeight, Image.SCALE_SMOOTH);
                BufferedImage resized = new BufferedImage(maxWidth, newHeight, BufferedImage.TYPE_INT_RGB);
                resized.getGraphics().drawImage(scaled, 0, 0, null);
                img = resized;
            }

            // 💡 Use same format if supported, else fallback to PNG (lossless)
            String outputFormat = format.equalsIgnoreCase("jpeg") || format.equalsIgnoreCase("jpg") ? "jpeg" : "png";

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(img, outputFormat, baos);
            return baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return inputData; // fallback
        }
    }

    // 🔎 Detect image format from magic bytes
    private String detectImageFormat(byte[] data) {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(data);
             ImageInputStream iis = javax.imageio.ImageIO.createImageInputStream(bis)) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
            if (readers.hasNext()) {
                return readers.next().getFormatName();
            }
        } catch (IOException ignored) {}
        return null;
    }
}
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Copy, ExternalLink, Link as LinkIcon, QrCode, Trash2, BarChart2, Upload, Download } from "lucide-react";
import QRCode from "qrcode.react";

// If you do NOT have these UI components, replace with plain HTML or your own components!
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

/**
 * URL Shortener (pure client-side)
 * - Hash-based redirect: share links like https://yourdomain.tld/#/r/<code>
 * - Stores mappings in localStorage (no server required)
 * - Optional custom alias and link expiry
 * - Click tracking (local only)
 * - Import/Export backups (JSON)
 */

const STORAGE_KEY = "urlshort.links.v1";

function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function isValidHttpUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
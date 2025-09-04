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

function randomCode(len = 6) {
  let out = "";
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function nowTs() {
  return Date.now();
}

function originWithHash() {
  // Use current origin + path so it works on any host
  return window.location.origin + window.location.pathname + "#/r/";
}

function shortUrlFor(code) {
  return originWithHash() + code;
}

function daysToMs(d) {
  return d * 24 * 60 * 60 * 1000;
}

export default function UrlShortenerApp() {
  const [links, setLinks] = useState(() => loadLinks());
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiryMode, setExpiryMode] = useState("none"); // none | 1 | 7 | 30 | custom
  const [customDays, setCustomDays] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null);
  const [autoPreviewQR, setAutoPreviewQR] = useState(false);
  const fileInputRef = useRef(null);

  // Persist
  useEffect(() => saveLinks(links), [links]);

  // On first mount: If hash matches #/r/<code>, perform redirect
  useEffect(() => {
    const { hash } = window.location;
    const match = hash.match(/^#\/r\/([A-Za-z0-9_-]+)$/);
    if (match) {
      const code = match[1];
      const all = loadLinks();
      const entry = all.find((x) => x.code === code);
      if (!entry) {
        // Show a simple not found view
        alert("Short link not found on this device. (This client-only app stores links in your browser's localStorage.)");
      } else {
        if (entry.expiresAt && nowTs() > entry.expiresAt) {
          alert("This link has expired.");
        } else {
          // Count click and go
          entry.clicks = (entry.clicks || 0) + 1;
          saveLinks([...all]);
          window.location.replace(entry.url);
        }
      }
    }
  }, []);

  const nonExpiredLinks = useMemo(() => {
    const ts = nowTs();
    return links.filter((l) => !l.expiresAt || ts <= l.expiresAt);
  }, [links]);

  const totalClicks = useMemo(() => links.reduce((a, b) => a + (b.clicks || 0), 0), [links]);

  function createLink(e) {
    e?.preventDefault();
    setError("");
    setCreated(null);

    if (!isValidHttpUrl// filepath: c:\Users\Santh\OneDrive\Desktop\23l35a0506\import.jsx
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

function randomCode(len = 6) {
  let out = "";
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function nowTs() {
  return Date.now();
}

function originWithHash() {
  // Use current origin + path so it works on any host
  return window.location.origin + window.location.pathname + "#/r/";
}

function shortUrlFor(code) {
  return originWithHash() + code;
}

function daysToMs(d) {
  return d * 24 * 60 * 60 * 1000;
}

export default function UrlShortenerApp() {
  const [links, setLinks] = useState(() => loadLinks());
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiryMode, setExpiryMode] = useState("none"); // none | 1 | 7 | 30 | custom
  const [customDays, setCustomDays] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null);
  const [autoPreviewQR, setAutoPreviewQR] = useState(false);
  const fileInputRef = useRef(null);

  // Persist
  useEffect(() => saveLinks(links), [links]);

  // On first mount: If hash matches #/r/<code>, perform redirect
  useEffect(() => {
    const { hash } = window.location;
    const match = hash.match(/^#\/r\/([A-Za-z0-9_-]+)$/);
    if (match) {
      const code = match[1];
      const all = loadLinks();
      const entry = all.find((x) => x.code === code);
      if (!entry) {
        // Show a simple not found view
        alert("Short link not found on this device. (This client-only app stores links in your browser's localStorage.)");
      } else {
        if (entry.expiresAt && nowTs() > entry.expiresAt) {
          alert("This link has expired.");
        } else
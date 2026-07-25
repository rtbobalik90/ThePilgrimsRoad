{
  "version": 1,
  "assets": [
    {
      "id": "settlement-shell",
      "path": "assets/settlement/settlement-shell.webp",
      "role": "Settlement-map base beneath live building and weather overlays",
      "width": 1170,
      "height": 1860,
      "aspectRatio": "390:620",
      "focalPoint": {
        "x": 0.5,
        "y": 0.48
      },
      "required": true,
      "fallback": "assets/settlement/settlement-shell-fallback.svg",
      "futureStates": [
        "storm",
        "overcast",
        "clear",
        "dawn-gold",
        "building-tiers",
        "dimness",
        "territory"
      ]
    }
  ]
}

{ pkgs ? import <nixpkgs> { } }:
with pkgs;

mkShell {
  name = "conhecimentosBeradeiros";

  # Add executable packages to the nix-shell environment.
  packages = with pkgs; [
    android-tools
    nodejs_20
    nodePackages.yarn
    nodePackages.npm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];

  DEVELOP = "true";
  ANDROID_HOME = "/usr/lib/android-sdk/";
}

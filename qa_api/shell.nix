{ pkgs ? import <nixpkgs> { } }:
with pkgs;

mkShell {
  name = "conhecimentosBeradeirosBackend";

  # Add executable packages to the nix-shell environment.
  packages = with pkgs; [
    python39
    pyright
    python39Packages.autopep8
  ];

  shellHook = ''
    if [ $SHELL = '/usr/bin/fish' ]
    then
      source ./venv/bin/activate.fish
    else
      source ./venv/bin/activate
    fi

  '';
}

import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import QRView from "../src/pages/QRView";

import { RenderService } from './utils.test/RenderService'
import { QRReaderFake } from '../src/services/qrreader.service'

// Mock el módulo de retriever
vi.mock('../src/camera/retriever', () => ({
  retrieve: vi.fn(),
}))

describe('User not registered should ', () => {
  describe('log correctly user not registered', () => {
    test('Show him a form', async () => {
       
      render(
        <RenderService>
          <QRView qrReaderService={new QRReaderFake()} />
        </RenderService>
      );



      const text = screen.getByText('staticText:QRView.scanQRPrompt'); 

      expect(text).toBeInTheDocument()

      await waitFor(() => {
        expect(
          screen.getByText((content, element) =>
            content.includes('Tarifa Base')
          )
        ).toBeInTheDocument()

         expect(
           screen.getByText((content, element) => content.includes('13 €/kWh'))
         ).toBeInTheDocument()

        expect(
          screen.getByText((content, element) => content.includes('EVB-P20261797'))
        ).toBeInTheDocument()
      })


      
      
    });
  });

  describe.skip('log incorrectly', () => {
    // Tu prueba aquí

  });
});

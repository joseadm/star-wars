import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';

describe('LogService', () => {
  let logService: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService]
    });
    logService = TestBed.inject(LogService);
  });

  it('should create the service', () => {
    expect(logService).toBeTruthy();
  });

  describe('log', () => {
    it('should log the message with a timestamp', () => {
      const consoleSpy = spyOn(console, 'log');
      const message = 'Hello, world!';
      const expectedLog = new Date() + ": " + JSON.stringify(message);
      
      logService.log(message);
      
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });
  });
});
